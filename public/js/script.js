document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const postId = this.getAttribute('data-post-id');
            const commentText = this.querySelector('textarea[name="comment"]').value;

            fetch('/comments/add', {
                method: 'POST',
                body: JSON.stringify({ postId, commentText }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Add the new comment to the page...
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
