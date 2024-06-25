document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Call the Unity function to pause the game
        SendMessage('PauseMenuManager', 'PauseGame');
        console.log("unfocused")
    } else {
        // Call the Unity function to resume the game
        SendMessage('PauseMenuManager', 'ResumeGame');
        console.log("focused")
    }
});