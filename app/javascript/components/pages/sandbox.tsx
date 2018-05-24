import * as React from 'react'
import 'react-virtualized/styles.css'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router-dom'

export default class VirtualizedTable extends React.Component {
  render() {
    let data = new Array(100000).fill({}).map((item, i) => ({ number: i, text: `product ${i}` }))
    return (
      <div>
        <Link to="/">ホーム</Link>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <Table
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowHeight={30}
                width={width}
                height={500}
                headerHeight={30}
              >
                <Column
                  dataKey={'number'}
                  label={'No'}
                  cellDataGetter={({ rowData }) => rowData.number}
                  width={120}
                  height={30}
                />
                <Column
                  dataKey={'text'}
                  label={'テキスト'}
                  cellDataGetter={({ rowData }) => rowData.text}
                  width={120}
                  height={30}
                />
              </Table>
            )
          }}
        </AutoSizer>
      </div>
    )
  }
}
