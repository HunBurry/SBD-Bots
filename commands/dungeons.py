'''
from selenium import webdriver
from selenium.webdriver.firefox.options import Options


options = Options()
#options.headless = True
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

cap = DesiredCapabilities().FIREFOX
cap["marionette"] = False
browser = webdriver.Firefox(capabilities=cap, executable_path='geckodriver.exe')
#driver = webdriver.Firefox(executable_path='geckodriver.exe')
browser.get("https://raid.report/xb/HunBurry")
'''

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import time;

def main(name):
    binary = r'C:\Program Files\Mozilla Firefox\firefox.exe'
    options = Options()
    options.set_headless(headless=True)
    options.binary = binary
    cap = DesiredCapabilities().FIREFOX
    cap["marionette"] = True #optional
    driver = webdriver.Firefox(options=options, capabilities=cap, executable_path="C:\\Users\\Public\\geckodriver.exe")
    driver.implicitly_wait(10)
    driver.get("https://dungeon.report/xb/" + name)
    arr = [];

    try:
        element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "total-completions"))
        )
        time.sleep(3)
        elements = driver.find_elements_by_class_name("total-completions")
        elements2 = driver.find_elements_by_class_name("s4")
        counter = 0;
        for el in elements:
            span = el.find_element_by_tag_name('span').text;
            arr.append(span);
            a = elements2[counter].find_element_by_tag_name("a").text;
            arr.append(a);
            counter = counter + 6;
    finally:
        driver.quit();
        for item in arr:
            print(item);

if __name__ == '__main__':
    main(sys.argv[1]);
