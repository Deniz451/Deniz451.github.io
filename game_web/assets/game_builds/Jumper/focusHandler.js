document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Call the Unity function to pause the game
        SendMessage('PauseMenuManager', 'PauseGame');
    } else {
        // Call the Unity function to resume the game
        SendMessage('PauseMenuManager', 'ResumeGame');
    }
});

function SendMessage(objectName, functionName) {
    console.log(`SendMessage called with ${objectName}, ${functionName}`);
    if (typeof unityInstance !== 'undefined' && unityInstance != null) {
        unityInstance.SendMessage(objectName, functionName);
    } else {
        console.error('unityInstance is not defined.');
    }
}