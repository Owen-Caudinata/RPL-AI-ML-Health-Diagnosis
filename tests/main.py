import unittest

# Import test modules
from test_login import UserLogin, AdminLogin

# Add more imports if you have additional test files

if __name__ == "__main__":
    test_suite = unittest.TestSuite()

    test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserLogin))
    test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(AdminLogin))
    

    runner = unittest.TextTestRunner()

    result = runner.run(test_suite)
    print("Total tests run:", result.testsRun)
    print("Failures:", len(result.failures))
    print("Errors:", len(result.errors))