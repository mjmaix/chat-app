# https://github.com/bamlab/generator-rn-toolbox/tree/master/generators/assets

PROJECT_NAME=Chat
IMAGE_FILE=./assets/icon_source-squared.jpg

echo "Generate icons for iOS"
yo rn-toolbox:assets --projectName $PROJECT_NAME -y --icon $IMAGE_FILE --force

echo "Generate icons for Android"
echo "Android >
    > Open your project in Android Studio
    > Right click on the app folder, then click on New and then click on Image Asset
    > In the Icon Type field select Launcher Icons (Adaptative and Legacy)
    > In the pathfield, select your image file
    > Once done, click on the Next button and then on the finish button
"
read -p "Complete the instructions before proceeding. Press any key to proceed..."

echo "Generate splashscreens for iOS"
yo rn-toolbox:assets --projectName $PROJECT_NAME -y --splash $IMAGE_FILE --ios
echo "Generate splashscreens for Android"
yo rn-toolbox:assets --projectName $PROJECT_NAME -y --splash $IMAGE_FILE --android
echo "Generate splashscreens for App Store and Play Store"
yo rn-toolbox:assets --projectName $PROJECT_NAME -y --splash $IMAGE_FILE --store

echo "Generate Android notification icons"
yo rn-toolbox:assets --projectName $PROJECT_NAME -y --android-notification-icon $IMAGE_FILE


npm run studio
