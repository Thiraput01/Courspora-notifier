import time
import logging
from scraper import check_new_content, init_driver

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

if __name__ == "__main__":
    # Initialize WebDriver once
    driver = init_driver()

    try:
        while True:
            check_new_content(driver)  # Pass the driver to the function
            time.sleep(60)  # Wait for 1 minute before checking again
            logging.info("1 min passed")
    finally:
        logging.info("Closing the WebDriver")
        driver.quit()  # Close the driver when done
