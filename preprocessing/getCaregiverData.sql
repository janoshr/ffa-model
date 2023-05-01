.headers on
.mode csv
.output rawCaregiverData.csv
select M.parentConfident as caregiverConfident,
  M.parentConfidentState as caregiverConfidentState,
  M.parentFeel as caregiverFeel,
  M.parentFeelState as caregiverFeelState,
  M.parentThink as caregiverThink,
  M.parentThinkState as caregiverThinkState
from MeasurementEvent M
  inner join Patient P on P.id = M.patientId
  inner join User U on U.id = P.userId
where M.illnessId != 'noId'
  and U.participateInResearch = true
  and (
    not U.email like 'janos.hajdurafis%'
    or U.email is null
  )
  -- and temperature is not null
  -- and pulse is not null
  -- and respiratoryRate is not null
;
.output stdout