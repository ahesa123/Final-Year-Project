# Final Year Project

post recipe json format:
{
"RECIPE_TITLE": "Jalapeno Popper Grilled Cheese Sandwich",
"IMAGE_URL": "https://bing.com/th?id=OSK.602054f41f7ba09555a9fa6f16cf42da",
"RECIPE_PUBLISHER": "xyzjyfuy",
"SOURCE_URL": "http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html",
"PUBLISHED_DATE": "2023-04-03"
}

CREATE TABLE T_RECIPES(
RECIPE_ID INT PRIMARY KEY AUTO_INCREMENT,
RECIPE_TITLE VARCHAR(200),
IMAGE_URL VARCHAR(200),
RECIPE_PUBLISHER VARCHAR(200),
SOURCE_URL VARCHAR(200),
PUBLISHED_DATE DATE
);
