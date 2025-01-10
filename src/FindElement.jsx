import { Box, Chip, Divider, TextField, Typography } from '@mui/material'
import { PopperHeight, PopperWidth, Status, StatusType } from 'mui-industrial'
import { useEffect, useState } from 'react'

export default function FindElement() {
  const [open, setOpen] = useState(false)

  const [xpath, setXpath] = useState('//*[@id="extra-dom-stats-wrapper"]/main/div/ol/li[*]/article/a/div/h4')
  const [parentXpath, setParentXpath] = useState('//*[@id="extra-dom-stats-wrapper"]/main/div/ol')

  const [foundElement, setFoundElement] = useState(null)
  const [foundElements, setFoundElements] = useState([])

  useEffect(() => {
    if (xpath === '') return
    const foundElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    if (foundElement) {
      console.log(foundElement)
      setFoundElement(foundElement.textContent)
    }
  }, [xpath])

  useEffect(() => {
    if (parentXpath === '') return
    if (xpath === '') return

    const foundParentElement = document.evaluate(parentXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    console.log(foundParentElement)

    if (foundParentElement) {
      const foundElementsIterator = document.evaluate(xpath, foundParentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      const elements = []
      let element = foundElementsIterator.iterateNext()

      while (element) {
        elements.push(element)
        element = foundElementsIterator.iterateNext()
      }

      console.log(elements)
      setFoundElements(elements.map(el => el.textContent))
    }
  }, [parentXpath, xpath])

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
      title: "Find Element",
      content: <Box p={4} flexDirection={'column'} display={'flex'} gap={4}>
        <Typography variant='h4' style={{ textTransform: 'none' }} color="textPrimary">Find Elements</Typography>
        <TextField label="XPath" value={xpath} onChange={(e) => setXpath(e.target.value)} />
        <TextField label="Parent XPath" value={parentXpath} onChange={(e) => setParentXpath(e.target.value)} />

        <Divider />
        {foundElement}

        <Divider />
        <Box display={'flex'} flexDirection={'row'} gap={1} flexWrap={'wrap'}>
          {foundElements.map((el, i) => <Chip key={i} label={el} variant='outlined' size='small' />)}
        </Box>
      </Box>,
    }}
    id={'findElement'}
    tooltip={"Find Element"} >
    <Status.Template {...{ text: "Find Element" }} badge={foundElements.length} />

  </Status >
}

//    //*[@id="extra-dom-stats-wrapper"]/main/div/ol/li[2]/article/a/div/h4
//     //*[@id="extra-dom-stats-wrapper"]/main/div/ol
