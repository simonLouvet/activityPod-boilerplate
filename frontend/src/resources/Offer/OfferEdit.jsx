import React from 'react';
import { Edit } from 'react-admin';
import OfferForm from './OfferForm';
import {ReferenceInput} from '@semapps/input-components';

const OfferEdit = () => (
  <Edit>
    <OfferForm />
  </Edit>
);

export default OfferEdit;
