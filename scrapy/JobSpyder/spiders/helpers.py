import re

def categorize_department(d):
    if re.search(r"(C[A-Z]O|VP|Executive)", d) or "leadership" in d.lower():
        return "Leadership"
    elif re.search(r"(sales|solutions|solution|value) (engineer|architecture|engineering)", d.lower()):
        return "Solutions Engineering"
    elif re.search("HR|People|Talent|Recruiting|Human", d):
        return "People"
    elif re.search("finance|financial|accounting|payroll|banking|fund ", d.lower()):
        return "Finance"
    elif "security" in d.lower() or "fraud" in d.lower():
        return "Security"
    elif "research" in d.lower() or "r&d" in d.lower():
        return "Research"
    elif re.match(r"(customer|client|partner|company|technical) success", d.lower()) or re.search("customer|client services|account management|success",d.lower()):
        return "Customer Success"
    elif "hardware" in d.lower():
        return "Hardware"
    elif re.search("strategy|business develop|business func", d.lower()):
        return "Business Development & Strategy"
    elif "product" in d.lower() or "platform" in d.lower():
        return "Product"
    elif re.search("legal|g&a|general & admin|compliance|licensing", d.lower()):
        return "Legal"
    elif re.search("IT|information technology", d.lower()):
        return "IT"
    elif "internship" in d.lower():
        return "Internship"
    elif re.search("data scien|machine learning|ml|algorithm|data", d.lower()) or "AI" in d:
        return "ML, Data Science, & Data"
    elif re.search("communications|translation|translator", d.lower()):
        return "Communications"
    elif "IT" in d or "information tech" in d.lower():
        return "IT"
    elif re.search("marketing|marketplace", d.lower()):
        return "Marketing"
    elif re.search("sales|go-to-market|go to market|solutions|account exec|upsell|growth",d.lower()) or "AE" in d:
        return "Sales"
    elif "clinical" in d.lower():
        return "Clinical"
    elif re.search("community|enablement|education|learning", d.lower()):
        return "Community"
    elif "manufacturing" in d.lower():
        return "Manufacturing"
    elif re.search("operations|ops",d.lower()):
        return "Operations"
    elif "support" in d.lower():
        return "Support"
    elif re.search("engineering|software|frontend|full stack|fullstack|mobile|web|android", d.lower()):
        return "Engineering"
    elif "brand" in d.lower():
        return "Branding"
    elif "revenue" in d.lower():
        return "Sales Ops"
    elif "quality" in d.lower() or "QA" in d:
        return "Quality Assurance"
    elif "payments" in d.lower():
        return "Payments"
    elif "onboarding" in d.lower() or "implementation" in d.lower():
        return "Implementation Team"
    elif "supply" in d.lower():
        return "Supply Chain"
    elif re.search("analytics|analyst|consulting|analysis", d.lower()):
        return "Consulting and Analysis"
    elif re.search("design|creative|experience", d.lower()):
        return "UX, Design & Creative"
    elif "warehous" in d.lower():
        return "Fufillment"
    elif "early" in d.lower():
        return "Entry Level"
    elif re.search("technology", d.lower()):
        return "Technology"
    elif re.search("retail", d.lower()):
        return "Retail"
    elif re.search("program manage", d.lower()):
        return "Program Management"
    elif re.search("molecular", d.lower()):
        return "Biology"
    elif re.search("global workforce", d.lower()):
        return "Global Workforce"
    else:
         return d