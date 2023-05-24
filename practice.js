document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    var name = document.getElementById('name').value;
    var rating = document.getElementById('rating').value;
    var comment = document.getElementById('comment').value;

    // Create review object
    var review = {
        name: name,
        rating: rating,
        comment: comment
    };

    // Save review to localStorage
    saveReview(review);

    // Clear form inputs
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('comment').value = '';

    // Refresh reviews
    showReviews();
});

function saveReview(review) {
    var reviews = [];
    if (localStorage.getItem('reviews')) {
        reviews = JSON.parse(localStorage.getItem('reviews'));
    }
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function showReviews() {
    var reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    if (localStorage.getItem('reviews')) {
        var reviews = JSON.parse(localStorage.getItem('reviews'));

        reviews.forEach(function(review) {
            var reviewElement = document.createElement('div');
            reviewElement.classList.add('review');

            var nameElement = document.createElement('p');
            nameElement.classList.add('name');
            nameElement.innerText = review.name;

            var ratingElement = document.createElement('p');
            ratingElement.classList.add('rating');
            ratingElement.innerText = 'Rating: ' + review.rating + ' Stars';

            var commentElement = document.createElement('p');
            commentElement.classList.add('comment');
            commentElement.innerText = review.comment;

            reviewElement.appendChild(nameElement);
            reviewElement.appendChild(ratingElement);
            reviewElement.appendChild(commentElement);

            reviewsContainer.appendChild(reviewElement);
        });
    }
}

// Show existing reviews on page load
showReviews();
