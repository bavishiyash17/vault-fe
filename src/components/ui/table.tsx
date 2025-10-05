import { AgGridReact } from 'ag-grid-react'
import {
    AllCommunityModule,
    ModuleRegistry,
    themeQuartz,
    type Theme,
    type ColDef,
    type GridReadyEvent,
    type IFilterComp,
} from 'ag-grid-community'
import vaultTheme from './ag-grid-theme'
ModuleRegistry.registerModules([AllCommunityModule])
// this are special type for only this component
type AgGridTableProps<T> = {
    defaultColDefs: ColDef
    columnDefs: ColDef[]
    rowData: T[]
    filterValue: string
    filterColumn: string
}
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type Ref,
    type RefAttributes,
} from 'react'
import { Cpu } from 'lucide-react'

const testTheme = themeQuartz.withParams({
    accentColor: '#FF0000',
    headerBackgroundColor: '#EEEEEE',
    backgroundColor: '#FF0000',
})

// Generic React component with props typed as AgGridTableProps<T>
const AgGridTable = <T,>({
    defaultColDefs,
    columnDefs,
    rowData,
    filterValue,
    filterColumn,
}: AgGridTableProps<T>) => {
    const [isGridReady, setIsGridReady] = useState<Boolean>(false)

    const gridRef = useRef<AgGridReact<any>>(null)

    const onGridReady = useCallback((params: any) => {
        setIsGridReady(true)
    }, [])

    const applyColumnFilter = async (
        filterColumn: string,
        filterValue: string
    ) => {
        if (!gridRef.current?.api) return

        try {
            console.log(filterColumn)
            const allColumns = gridRef.current.api.getAllGridColumns()
            const columnNames = allColumns.map((column) => {
                // You can choose to get the header name or the field name
                // getDisplayNameForColumn retrieves the displayed header name
                // column.getColId() retrieves the column ID (often the field name)
                return (
                    gridRef.current?.api.getDisplayNameForColumn(column) ||
                    column.getColId()
                )
            })

            const filterInstance =
                await gridRef.current.api.getColumnFilterInstance(filterColumn)

            if (!filterInstance || !('setModel' in filterInstance)) {
                return
            }

            if (filterValue === '') {
                console.log('Cleared')
                filterInstance.setModel(null) // Clear filter
            } else {
                console.log('Filtered')
                filterInstance.setModel({
                    type: 'equals',
                    filter: filterValue,
                })
            }

            gridRef.current.api.onFilterChanged()
            console.log('Completed')
        } catch (error) {
            console.error('Error applying filter:', error)
        }
    }

    useEffect(() => {
        if (!isGridReady || !gridRef.current) return

        applyColumnFilter(filterColumn, filterValue)
    }, [isGridReady, filterValue])

    return (
        <div className="w-full" style={{ height: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowHeight={56}
                defaultColDef={defaultColDefs}
                rowClass={'items-center'}
                columnDefs={columnDefs}
                rowData={rowData}
                theme={vaultTheme}
                onGridReady={onGridReady}
            />
        </div>
    )
}

export { AgGridTable }
