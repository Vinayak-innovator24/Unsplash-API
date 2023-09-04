import React, { useState, useEffect } from 'react';
import '../App.css';

const DisplayImage = () => {
    const [image, setImage] = useState(null);

    const apiKey = 'KJOA_3KqntbldLbJuOhIh7tq9QuqPy5N3TZ46F1njAY';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setImage(data);
            })
            .catch((error) => {
                console.log('Error fetching image:', error);
            });
    }, [apiUrl]);

    return (
        <div className="display-image">
            {image && (
                <img
                    src={image.urls.regular}
                    alt={image.description}
                    className="image"
                />
            )}
        </div>
    );
};

export default DisplayImage;