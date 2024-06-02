import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from dotenv import load_dotenv
import time

load_dotenv()

USER_URL = os.getenv("USER_URL")
ADMIN_URL = os.getenv("ADMIN_URL")
USER_EMAIL = os.getenv("USER_EMAIL")
USER_PASSWORD = os.getenv("USER_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD= os.getenv("ADMIN_PASSWORD")

class UserVisitFetal(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(USER_URL + "/login")

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys(USER_EMAIL)
        password_field.send_keys(USER_PASSWORD)
        login_button.submit()
        time.sleep(3)
        
        driver.get(USER_URL)
        self.assertIn("Optimize Your Health", driver.page_source)
        time.sleep(1)
    
        driver.get(USER_URL + "/fetal")
        time.sleep(1)
        
        add_fetal= driver.find_element(By.ID, "Addfetal")
        add_fetal.click()
        time.sleep(1)
        
    def tearDown(self):
        self.driver.quit()


class AdminVisitFetal(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(ADMIN_URL + "/login")

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys(ADMIN_EMAIL)
        password_field.send_keys(ADMIN_PASSWORD)
        login_button.submit()

    
        time.sleep(3)
        
        heading1 = driver.find_element(By.TAG_NAME, 'h1')
        driver.get(ADMIN_URL + "/fetal")
        self.assertIn("Logo", driver.page_source)  
           

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
