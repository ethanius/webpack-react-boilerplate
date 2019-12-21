import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src = '' }) => <img src={src} alt="" />;

Image.propTypes = {
	src: PropTypes.string.isRequired,
};

export default Image;
