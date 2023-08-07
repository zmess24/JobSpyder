import scrapy
from ..items import (
    CompanyItem, RoleItem
)

from . import helpers

SELECTOR_MAP = {
    "topstartups": {
        "COMPANY_SELECTOR" : "#startup-website-link h7",
        "JOB_LINK" : "#job-title",
        "COMPANY_LINK_SELECTOR" : "#startup-website-link::attr('href')",
        "JOB_BOARD_SELECTOR" : "#view-jobs::attr('href')",
        "LOGO_SELECTOR" : "img::attr('src')",
        "INDUSTRIES_SELECTOR" : "#industry-tags::text",
        "NEXT_LINK" : ".infinite-more-link",
    }
}

class RoleSpider(scrapy.Spider):
    name = 'role'
    start_urls = ['https://topstartups.io/jobs/']

    # HELPER METHODS
    def sanitize_url(self, url):
        if url == None:
            return ""
        else:
            return url

    
    def sanitize_deparment(self, department):
        if department != None:
            return helpers.categorize_department(department.lstrip().rstrip())
        else:
             return "Other"
    
    def sanitize_industries(self, industries):
        if industries == []:
            return industries
        else:
            return list(map(lambda i: i.strip().title(), industries))
        
    def santize_role_link(self, link):
        if "https" in link:
            return link
        else:
            return f"https://boards.greenhouse.io{link}"
            
    def grab_job_board_name(self, job_board):
        job_board_name = None

        if 'lever.co'in job_board:
            job_board_name = "lever"
        elif 'greenhouse.io' in job_board:
            job_board_name = "greenhouse"
        
        return job_board_name
    
    def get_company_obj(self, company):
        company_obj = CompanyItem(
            _id = f'_{company.css(SELECTOR_MAP["topstartups"]["NAME_SELECTOR"]).extract_first().lower().replace(" ", "").replace(".", "")}',
            name = company.css(SELECTOR_MAP["topstartups"]["NAME_SELECTOR"]).extract_first(),
            company_link = self.sanitize_url(company.css(SELECTOR_MAP["topstartups"]["COMPANY_LINK_SELECTOR"]).extract_first()),
            job_board = self.sanitize_url(company.css(SELECTOR_MAP["topstartups"]["JOB_BOARD_SELECTOR"]).extract_first()),
            logo = company.css(SELECTOR_MAP["topstartups"]["LOGO_SELECTOR"]).extract_first(),
            industries = self.sanitize_industries(company.css(SELECTOR_MAP["topstartups"]["INDUSTRIES_SELECTOR"]).extract()),
            open_roles = []
        )

        return company_obj

    def get_roles_obj(self, response):
        company_obj = response.meta.get('company_obj')
        job_board_name = response.meta.get('job_board_name')

        for department in response.css(SELECTOR_MAP[job_board_name]["DEPARTMENTS_SELECTOR"]):
                for opening in department.css(SELECTOR_MAP[job_board_name]["OPENINGS_SELECTOR"]):
                        
                    link = opening.css(SELECTOR_MAP[job_board_name]['LINK_SELECTOR']).extract_first()

                    if job_board_name == 'greenhouse':
                         link = self.santize_role_link(link)   

                    role = RoleItem(
                        title = opening.css(SELECTOR_MAP[job_board_name]['TITLE_SELECTOR']).extract_first(),
                        department = self.sanitize_deparment(department.css(SELECTOR_MAP[job_board_name]['DEPARTMENT_SELECTOR']).extract_first()),
                        location = opening.css(SELECTOR_MAP[job_board_name]['LOCATION_SELECTOR']).extract_first(),
                        link = link
                    )

                    company_obj.open_roles.append(role)
        
        yield company_obj

    def parse(self, response):

        for company in response.css(SELECTOR_MAP["topstartups"]["COMPANY_SELECTOR"]):
            if company.css(SELECTOR_MAP["topstartups"]["NAME_SELECTOR"]).extract_first() != None and company.css(SELECTOR_MAP["topstartups"]["COMPANY_LINK_SELECTOR"]).extract_first() != None:
                company_obj = self.get_company_obj(company)
                job_board_name = self.grab_job_board_name(company_obj.job_board)

                if job_board_name:
                    yield scrapy.Request(
                        url = company_obj.job_board,
                        callback = self.get_roles_obj,
                        meta = { 'job_board_name': job_board_name, 'company_obj': company_obj }
                    )
                else:
                    yield company_obj

        for next_page in response.css(SELECTOR_MAP["topstartups"]["NEXT_LINK"]):
            yield response.follow(next_page, self.parse)