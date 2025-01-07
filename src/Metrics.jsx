import { PopperHeight, PopperWidth, Status, StatusType } from 'mui-industrial'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Sparkline from './Sparkline'


export default function Metrics({ text, icon, values, value, averageValue, unit }) {
  const [open, setOpen] = useState(false)

  return <Status
    style={{ pointerEvents: 'auto' }}
    options={{
      as: StatusType.POPPER,
      popper: {
        width: PopperWidth.MD,
        height: PopperHeight.MD,
        onClose: () => setOpen(false),
      },
      open,
      title: 'Github documentation',
      content: <>div</>,
    }}
    id="githubPage"
    tooltip="Project's Github documentation">
    <Status.Template {...{ icon, text }} badge={`${value} ${unit} (${averageValue} avg)`}>
      <Sparkline
        data={values}
        width={100} height={20} stroke="blue" strokeWidth={2} tooltip={false} />
    </Status.Template>
  </Status>
}

Metrics.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.number.isRequired,
  averageValue: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
}
