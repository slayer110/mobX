// external
import React from 'react';

// internal
import { createPostsAndAppealsList } from './utils/createPostsAndAppealsList';

export function CreatePostsAndAppeals() {
    React.useEffect(() => createPostsAndAppealsList(), []);

    return null;
}
