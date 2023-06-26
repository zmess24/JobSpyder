import re

def categorize_department(d):
    if re.search(r"C[A-Z]O", d) or "VP" in d or "leadership" in d.lower():
        return "Leadership"
    elif re.search(r"(sales|solutions|solution|value) (engineer|architecture|engineering)", d.lower()):
        return "Solutions Engineering"
    elif re.search("HR|People|Talent|Recruiting", d):
        return "People"
    elif re.search("finance|financial|accounting|payroll", d.lower()):
        return "Finance"
    elif "security" in d.lower() or "fraud" in d.lower():
        return "Security"
    elif "research" in d.lower() or "r&d" in d.lower():
        return "Research"
    elif re.match(r"(customer|client|partner|company|technical) success", d.lower()) or re.search("customer|client services|account management",d.lower()):
        return "Customer Success"
    elif "hardware" in d.lower():
        return "Hardware"
    elif re.search("strategy|business develop|business func", d.lower()):
        return "Business Development & Strategy"
    elif "product" in d.lower() or "platform" in d.lower():
        return "Product"
    elif re.search("legal|g&a|general & admin|compliance", d.lower()):
        return "Legal"
    elif re.search("IT|information technology", d.lower()):
        return "IT"
    elif "internship" in d.lower():
        return "Internship"
    elif re.search("data scien|machine learning|ml", d.lower()) or "AI" in d:
        return "ML & Data Science"
    elif re.search("communications|translation|translator", d.lower()):
        return "Communications"
    elif "IT" in d or "information tech" in d.lower():
        return "IT"
    elif "marketing" in d.lower():
        return "Marketing"
    elif re.search("sales|go-to-market|go to market|solutions|account exec",d.lower()):
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
    elif re.search("engineering|software|frontend|full stack|fullstack|mobile|web", d.lower()):
        return "Engineering"
    elif "brand" in d.lower():
        return "Branding"
    else:
         return d