type SelectWrapperPropObject = {
    value: string
    placeHolder: string
}

type SelectWrapperProps = {
    items: SelectWrapperPropObject[]
    label?: string
    width?: string
    columnName: string
    selectState: React.Dispatch<React.SetStateAction<string>>
    selectColumn: React.Dispatch<React.SetStateAction<string>>
}

type Threat = {
    threatId: number
    detectionTime: string
    severity: 'high' | 'critical' | 'medium' | 'low'
    status: 'in-progress' | 'blocked' | 'resolved' | 'pending'
}

type EventLogs = {
    logId: number
    timestamp: string
    user: string
    eventType: string
    status: 'in-progress' | 'blocked' | 'resolved' | 'pending'
}

export type { SelectWrapperProps, Threat, EventLogs }
