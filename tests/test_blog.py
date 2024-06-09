import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

ADMIN_URL = os.getenv("ADMIN_URL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

class AdminCreateBlog(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(ADMIN_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys(ADMIN_EMAIL)
        password_field.send_keys(ADMIN_PASSWORD)

        login_button.submit()

        time.sleep(5)
        self.assertIn("Doc.ai", driver.page_source)

        driver.get(ADMIN_URL + "/blog")
        time.sleep(5)

        driver.get(ADMIN_URL + "/blog-add")
        time.sleep(5)

        self.assertIn("Add Blog", driver.page_source)


    def tearDown(self):
        self.driver.close()

