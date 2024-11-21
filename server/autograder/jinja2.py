from jinja2 import Environment  

def environment(**options):  
    env = Environment(**options)  
    env.globals.update({  
        "autoescape": False # not generating html, don't autoescape
    })
    return env