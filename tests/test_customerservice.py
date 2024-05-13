import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

USER_URL = os.getenv("USER_URL")
ADMIN_URL = os.getenv("ADMIN_URL")

class UserCreateFeedback(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_create_feedback(self):
        driver = self.driver
        driver.get(USER_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys("jamesmichael0555@gmail.com")
        password_field.send_keys("GekkoMain")

        login_button.submit()

        time.sleep(1)
        self.assertIn("Optimize Your Health ", driver.page_source)

        driver.get(USER_URL + "/get")
        time.sleep(1)

        driver.get(USER_URL + "/create")
        time.sleep(1)

        self.assertIn("Add Data", driver.page_source)

        feedback_field = driver.find_element(By.ID, "feedback")
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        feedback_field.send_keys("Test Feedback")

        submit_button.submit()

        time.sleep(1)

        self.assertIn("Feedback created successfully", driver.page_source)

    def tearDown(self):
        self.driver.close()