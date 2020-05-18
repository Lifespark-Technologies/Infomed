import React from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default () => {

  return (
      <div style={{ height: 700, marginTop: 40 }}>
        <Calendar 
          localizer={localizer}
          events={[
              {
                'title': 'My event',
                'allDay': false,
                'start': new Date(2020, 4, 18, 8, 0),
                'end': new Date(2020, 4, 18, 14, 0)
              }
          ]}
          step={60}
          view='week'
          views={['week']}
          min={new Date(2020, 4, 18, 8, 0 )}
          max={new Date(2020, 4, 18, 17, 0 )}
          date={new Date(2020, 4, 18)}
        />
      </div>
  )
}