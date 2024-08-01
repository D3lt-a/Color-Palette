document.addEventListener('DOMContentLoaded', function() {
    displayRecentStories();
});

function displayRecentStories() {
    const recentStories = document.getElementById('recentStories');
    let stories = JSON.parse(localStorage.getItem('stories')) || [];
    
    // Sort stories by date, most recent first
    stories.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display the 3 most recent stories
    stories.slice(0, 3).forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        
        storyItem.innerHTML = `
            <h4>${story.title}</h4>
            <p><strong>By:</strong> ${story.author} <br><strong>Date:</strong> ${new Date(story.date).toLocaleString()}</p>
            <p>${story.content.substring(0, 100)}... <a href="stories.html">Read more</a></p>
        `;
        
        recentStories.appendChild(storyItem);
    });
}
