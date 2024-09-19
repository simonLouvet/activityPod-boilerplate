import { Box, Chip } from '@mui/material';

const TagsSelector = props => {
  const { selectedTags, setSelectedTags, tags = [] } = props;

  const onClickTag = tagId => () => {
    if (selectedTags.includes(tagId)) setSelectedTags(selectedTags.filter(tag => tag !== tagId));
    else setSelectedTags([...selectedTags, tagId]);
  };

  return (
    <Box display="flex" columnGap="0.5rem">
      {tags?.map(tag => (
        <Chip
          label={tag['skos:prefLabel']}
          onClick={onClickTag(tag.id)}
          color={selectedTags.includes(tag.id) ? 'primary' : 'default'}
        />
      ))}
    </Box>
  );
};

export default TagsSelector;
