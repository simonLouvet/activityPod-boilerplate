import { Toolbar, SaveButton } from 'react-admin';
import PublishButton from './buttons/PublishButton';

export const MyToolbar = () => {
    console.log('MyToolbar');
    return (
        <Toolbar>
            <SaveButton />
            <PublishButton />
        </Toolbar>
    );
};