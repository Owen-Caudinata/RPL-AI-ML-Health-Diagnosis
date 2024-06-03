import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

ADMIN_URL = os.getenv("ADMIN_URL")

class AdminVisitNewsletter(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(ADMIN_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys("admin@admin.com")
        password_field.send_keys("admin")

        login_button.submit()
        time.sleep(5)

        driver.get(ADMIN_URL + "/daily-newsletter")
        time.sleep(1)

        self.assertIn("Add Daily Newsletter", driver.page_source)

    def tearDown(self):
        self.driver.close()

