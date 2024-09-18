import React from 'react';
import { useNotify, useRecordContext, useResourceContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import GetAppIcon from '@mui/icons-material/GetApp';

// const PUBLISHED_STATUS = 'https://data.lescheminsdelatransition.org/publication-status/valide';
// const UNPUBLISHED_STATUS = 'https://data.lescheminsdelatransition.org/publication-status/en-cours';

const PublishButton = () => {
    const record = useRecordContext();
    const resource = useResourceContext();
    const notify = useNotify();
    const [update] = useUpdate();

    //   const isPublished = record['cdlt:hasPublicationStatus'] === PUBLISHED_STATUS;
    const isPublished = false;

    const publish = (e) => {
        e.stopPropagation();
        update(resource, { id: record.id, data: { ...record, 'as:published': new Date().toISOString() }, previousData: record });
        notify('La ressource a été publié');
    };

    const unpublish = (e) => {
        e.stopPropagation();
        // update(resource, { id: record.id, data: { ...record, 'cdlt:hasPublicationStatus': UNPUBLISHED_STATUS }, previousData: record });
        // notify('La ressource a été dépublié');
    };

    return (
        <Button
            startIcon={isPublished ? <GetAppIcon /> : <PublishIcon />}
            onClick={isPublished ? unpublish : publish}
        >
            {isPublished ? 'Dépublier' : 'Publier'}
        </Button>
    );
};

export default PublishButton;