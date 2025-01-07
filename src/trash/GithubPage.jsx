import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { PopperHeight, PopperWidth, Status, StatusType } from 'mui-industrial'

const src = 'https://github.com/rand0mC0d3r/mui-industrial#readme'

export default function GithubPage() {
  return <Status
    style={{ pointerEvents: 'auto' }}
    options={{
      as: StatusType.POPPER,
      popper: {
        width: PopperWidth.XL,
        height: PopperHeight.XL
      },
      title: 'Github documentation',
      // actions: [
      //   {
      //     icon: <OpenInNewIcon />,
      //     tooltip: 'Open in new tab',
      //     onClick: () => window.open(src, '_blank'),
      //   }
      // ],
      content: <iframe style={{ border: '0px', width: '100%', height: '100%' }} {...{ src }} />,
    }}
    id="githubPage"
    tooltip="Project's Github documentation">
    <Status.Template {...{ icon: <GitHubIcon />, text: 'Github Ref' }} />
  </Status>
}
