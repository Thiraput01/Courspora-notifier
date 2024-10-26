import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from sender import send_to_discord

prev_course = set()

# Initialize the WebDriver
def init_driver():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-software-rasterizer')
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

def check_new_content(driver):
    global prev_course
    url = 'https://www.courspora.my.id/course'
    
    try:
        driver.get(url)
        main_content = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'main'))
        )
        
        course_list = main_content.find_element(By.CLASS_NAME, 'grid')

        # Extract course information
        courses = course_list.find_elements(By.TAG_NAME, 'li')
        seen_courses = set(course.text for course in courses)
        new_courses = seen_courses.difference(prev_course)

        if not new_courses:
            logging.info('No new content found.')
        else:
            for course in courses:
                if course.text in new_courses:
                    try:
                        title = course.find_element(By.TAG_NAME, 'h2').text
                        author = course.find_element(By.XPATH, './/p[contains(@class, "text-muted-foreground")]').text
                        ratings = course.find_element(By.XPATH, './/div[contains(@class, "flex items-center gap-2")]/p').text
                        url = course.find_element(By.TAG_NAME, 'a').get_attribute('href')
                        img_url = course.find_element(By.XPATH, './/img').get_attribute('src')
                        course_info = {
                            "name": title,
                            "author": author,
                            "ratings": ratings,
                            "url": url,
                            "img_url": img_url
                        }
                        logging.info(f'New content found: {course_info}')
                        send_to_discord(course_info)  # Send to Discord
                    except Exception as e:
                        logging.error(f'Error extracting course details: {e}')
            prev_course = seen_courses
    except Exception as e:
        logging.error(f'An error occurred: {e}')
