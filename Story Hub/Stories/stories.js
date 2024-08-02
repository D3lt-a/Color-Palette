document.addEventListener('DOMContentLoaded', function() {
    displayStories();
});

function postStory() {
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').value;
    const username = sessionStorage.getItem('currentUser');

    if (title && content) {
        const newStory = {
            title,
            content,
            author: username,
            date: new Date().toISOString()
        };

        let stories = JSON.parse(localStorage.getItem('stories')) || [];
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));

        document.getElementById('storyTitle').value = '';
        document.getElementById('storyContent').value = '';
        displayStories();
    } else {
        alert('Both title and content are required.');
    }

    return false; // Prevent the form from submitting normally
}

function displayStories() {
    const storyList = document.getElementById('storyList');
    let stories = JSON.parse(localStorage.getItem('stories')) || [];
    
    storyList.innerHTML = '';
    
    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        
        storyItem.innerHTML = `
            <h4>${story.title}</h4>
            <p><strong>By:</strong> ${story.author} <br><strong>Date:</strong> ${new Date(story.date).toLocaleString()}</p>
            <p>${story.content}</p>
        `;
        
        storyList.appendChild(storyItem);
    });
}

/* 
    TODO
    -Check the Author username
*/