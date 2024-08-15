import Icon from '../styling/icon';
import Box from '@mui/material/Box';
import Dropdown from '../Dropdowns/BasicDropdown';
import Card from '@mui/material/Card';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const getBorderStyle = (isSelected, isOpen) => {
  if (isOpen) {
    return {
      border: 3,
      borderColor: 'rgb(18, 14, 107)',
    };
  }
  if (isSelected) {
    return {
      border: 3,
      borderColor: 'rgb(18, 14, 107)',
    };
  }
  return {
    border: 3,
    borderColor: 'rgb(255, 255, 255)',
  };
};

const FilterCard = ({ title, content, onSelect, isSelected, isOpen, onOpen }) => {
  const [showDropdown, setShowDropdown] = useState(isOpen);


  const handleCardClick = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
      onOpen();
    }
  };

  const handleSelect = () => {
    onSelect();
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
      onOpen();
    }
  };
  const dropdownItems = ['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3'];

  return (
    <div>
      <Box sx={{ width: '250px' }}>
        <Card
          sx={{
            width: '100%',
            cursor: 'pointer',
            height: '65px',
            ...getBorderStyle(isSelected, showDropdown),
          }}
          onClick={()=>handleSelect()}
        >
          <CardContent sx={{ py: (theme) => `${theme.spacing(0.75)} !important`}}>
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <Typography variant='subtitle1' sx={{ textTransform: 'capitalize' }}>{title}</Typography>
                  <Icon icon={'mdi-info-outline'} fontSize={20} marginTop={13} />
                </div>
                <Typography variant='caption' sx={{ color: 'rgb(117, 116, 123)' }}>{content}</Typography>
              </Box>
              <Box sx={{ alignItems: 'center', justifyContent: 'center', marginTop: '13px' }} onClick={handleCardClick}>
                {showDropdown ? <Icon icon={'mdi-chevron-up'} /> : <Icon icon={'mdi-chevron-down'} />}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {showDropdown &&
        <div style={{ position: 'relative' }}>
          <div>
            <Dropdown title={title} items={dropdownItems} />
          </div>
        </div>
      }
    </div>
  );
};

export default FilterCard;
