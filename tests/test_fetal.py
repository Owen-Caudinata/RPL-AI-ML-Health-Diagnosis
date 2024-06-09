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
USER_EMAIL = os.getenv("USER_EMAIL")
USER_PASSWORD = os.getenv("USER_PASSWORD")

ADMIN_URL = os.getenv("ADMIN_URL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

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

        login_button.click()
        time.sleep(5)
        
        
        driver.get(USER_URL)
        self.assertIn("Optimize Your Health", driver.page_source)
        time.sleep(5)
        
        driver.get(USER_URL + "/fetal")
        time.sleep(5)
        self.assertIn("Print", driver.page_source) 
        
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

        login_button.click()
    
        time.sleep(5)
        
        driver.get(ADMIN_URL + "/fetal")  
        user_id_field = driver.find_element(By.NAME, "userId")
        mean_stv_field = driver.find_element(By.NAME, "mean_stv")
        altv_field = driver.find_element(By.NAME, "percent_altv")
        astv_field = driver.find_element(By.NAME, "astv")
        mean_hist_field = driver.find_element(By.NAME, "mean_hist")
        prolongued_decelerations_field = driver.find_element(By.NAME, "prolongued_decelerations")
        
        user_id_field.send_keys("10")
        mean_stv_field.send_keys("10")
        altv_field.send_keys("10")
        astv_field.send_keys("10")
        mean_hist_field.send_keys("10")
        prolongued_decelerations_field.send_keys("10")
        
    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
