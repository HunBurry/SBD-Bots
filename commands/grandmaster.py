from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys

def main(name):
    binary = r'C:\Program Files\Mozilla Firefox\firefox.exe'
    options = Options()
    options.set_headless(headless=True)
    options.binary = binary
    cap = DesiredCapabilities().FIREFOX
    cap["marionette"] = True #optional
    driver = webdriver.Firefox(options=options, capabilities=cap, executable_path="C:\\Users\\Public\\geckodriver.exe")
    driver.implicitly_wait(10)
    driver.get("https://grandmaster.report/user/1/" + name)
    arr = [];

    try:
        element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "UserActivity_cardContainer__2vOAf"))
        )
        elements = driver.find_elements_by_class_name("UserActivity_cardContainer__2vOAf")
        for el in elements:
            span = el.find_elements_by_tag_name("p")[1].text.replace('\n', ' ')
            print(span)
            arr.append(span);
    finally:
        driver.quit()

if __name__ == '__main__':
    main(sys.argv[1]);