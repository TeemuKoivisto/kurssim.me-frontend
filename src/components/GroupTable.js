import React from 'react'

import './GroupTable.scss'

const GroupTable = ({ groups }) => (
  <div className="group-table">
    <div className="group-table__header">
      <div className="group__name">Nimi</div>
      <div className="group__teacher">Vetäjä</div>
      <div className="group__enrolled">Ilm.</div>
      <div className="group__maximum">Max</div>
      <div className="group__schedule__header">Aikataulu</div>
    </div>
    {groups.map((group, i) => (
      <div key={i} className="group-table__item">
        <div className="row--inline">
          <div className="">Nimi</div>
          <div className="">{group.group_name}</div>
        </div>
        <div className="row--inline">
          <div className="">Vetäjä</div>
          <div className="">{group.group_teacher}</div>
        </div>
        <div className="row--inline">
          <div className="">Ilm.</div>
          <div className="">{group.enrolled}</div>
        </div>
        <div className="row--inline">
          <div className="">Max</div>
          <div className="">{group.enrollment_max}</div>
        </div>
        <div className="row--inline">
          <div className="">Aikataulu</div>
          <div className="">
            {group.schedule.map((s, i) => (
              <div key={i} className="group__schedule__container">
                <div className="group__schedule">
                  <div className="schedule__day">
                    {s.day}
                  </div>
                  <div className="schedule__date">
                    {s.date}
                  </div>
                  <div className="schedule__time">
                    {s.time}
                  </div>
                  <div className="schedule__classroom">
                    {s.classroom}
                  </div>
                </div>
                <div className="group__schedule--inline">
                  <div className="schedule__day-date">
                      {`${s.day} ${s.date}`}
                  </div>
                  <div className="schedule__time-classroom">
                    {`${s.time} ${s.classroom}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="group__name">{group.group_name}</div>
        <div className="group__teacher">
          {group.group_teacher}
        </div>
        <div className="group__enrolled">
          {group.enrolled}
        </div>
        <div className="group__maximum">
          {group.enrollment_max}
        </div>
        <div className="group__schedule__wrapper">
          {group.schedule.map((s, i) => (
            <div key={i} className="group__schedule__container">
              <div className="group__schedule">
                <div className="schedule__day">
                  {s.day}
                </div>
                <div className="schedule__date">
                  {s.date}
                </div>
                <div className="schedule__time">
                  {s.time}
                </div>
                <div className="schedule__classroom">
                  {s.classroom}
                </div>
              </div>
              <div className="group__schedule--inline">
                <div className="schedule__day-date">
                    {`${s.day} ${s.date}`}
                </div>
                <div className="schedule__time-classroom">
                  {`${s.time} ${s.classroom}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default GroupTable