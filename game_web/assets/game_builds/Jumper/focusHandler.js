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
    var unityInstance = unityInstance || UnityLoader.instantiate("unityContainer", "Build/YourGame.json");
    unityInstance.SendMessage(objectName, functionName);
}