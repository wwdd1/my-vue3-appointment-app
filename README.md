Conceptual design

Components

Button
AvatarGroup
Avatar
Text
Badge
Icon
Input [type=(select, datetime, text)]
Orientation
Header


List (abstract, has common capabilities like search, filter, order)
  |-> PaginationList (extends List)


ListItem (abstract)
  |-> AppointmentListItem (skeleton support from list item)


Modal (abstract)
  |-> CreateAppointmentModal
  |-> EditAppointmentModal

Layout
  |-> AppointmentsLayout




![image][def]

[def]: ./docs/components-diagram.png