import React from 'react'

const GroupTable = ({ groups }) => (
  <div className="course-list__item__group">
    <div className="course-list__item__groups__header">
      <div className="course-list__item__group__name">Nimi</div>
      <div className="course-list__item__group__teacher">Vetäjä</div>
      <div className="course-list__item__group__enrolled">Ilm.</div>
      <div className="course-list__item__group__maximum">Max</div>
      <div className="course-list__item__group__time">Pvm</div>
      <div className="course-list__item__group__classroom">Luokka</div>
    </div>
    {groups.map((group, i) => (
      <div key={i} className="course-list__item__groups__group">
        <div className="course-list__item__group__name">{group.group_name}</div>
        <div className="course-list__item__group__teacher">
          {group.group_teacher}
        </div>
        <div className="course-list__item__group__enrolled">
          {group.enrolled}
        </div>
        <div className="course-list__item__group__maximum">
          {group.enrollment_max}
        </div>
        <div className="course-list__item__groups__group__schedule__container">
          {group.schedule.map((s, i) => (
            <div key={i} className="course-list__item__groups__group__schedule">
              <div className="course-list__item__group__time--full">
                {s.time.split(' ').map((timeChunk, i) => (
                  <div
                    key={i}
                    className="course-list__item__group__time--chunk"
                  >
                    {timeChunk}
                  </div>
                ))}
              </div>
              <div className="course-list__item__group__classroom--full">
                {s.classroom}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default GroupTable