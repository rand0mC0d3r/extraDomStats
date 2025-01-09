import { Box, Chip, Typography } from '@mui/material'
import { PopperHeight, PopperWidth, Status, StatusType } from 'mui-industrial'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Sparkline from './Sparkline'

export default function Metrics({ uniqueKey, text, icon, values, value, averageValue, unit }) {
  const [open, setOpen] = useState(false)

  return <Status
    onClick={() => setOpen(!open)}
    style={{ pointerEvents: 'auto' }}
    options={{
      as: StatusType.POPPER,
      popper: {
        width: PopperWidth.SM,
        height: PopperHeight.AUTO,
        onClose: () => { setOpen(false) }
      },
      open,
      title: text,
      content: <Box p={4} flexDirection={'column'} display={'flex'} gap={4}>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Typography variant='h5' color="textPrimary">{icon} {text}</Typography>

          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <Chip label={`${value} ${unit}`} />
            <Chip label={`${averageValue} ${unit} avg`} />
          </Box>
          {/* <Typography variant='subtitle1' color="textPrimary">{value} {unit}</Typography> */}
          {/* <Typography variant='subtitle2' color="textSecondary">

            {averageValue} {unit}
          </Typography> */}
        </Box>
        <Sparkline
          data={values}
          width={375} height={48} stroke="blue" strokeWidth={2} tooltip={true} />
      </Box>,
    }}
    id={uniqueKey}
    tooltip={text} >
    <Status.Template {...{ icon, text }} />
    <Status.Template >
      <Sparkline
        data={values}
        width={100} height={16} stroke="blue" strokeWidth={2} tooltip={false} />
    </Status.Template >
    <Status.Template badge={`${value} ${unit} (${averageValue} avg)`} />

  </Status >
}

Metrics.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.number.isRequired,
  averageValue: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
}
