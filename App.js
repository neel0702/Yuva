import React, { useState } from 'react';
import Calendar from 'react-calendar';
import WeekCalendar from 'react-week-calendar';
import Modal from 'react-modal';
import moment from 'moment';
import 'react-week-calendar/dist/style.less';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [value, onChange] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventText, setEventText] = useState('');
  const [view, setView] = useState('month');
  const [services, setServices] = useState([]);

  const events = [{
    start: moment('2024-01-01').startOf('isoWeek').add(2, 'hours'),
    end: moment('2024-01-05').startOf('isoWeek').add(4, 'hours'),
    value: 'Sample Event'
  }];

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleInputChange(e) {
    setEventText(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Event text:', eventText);
    closeModal();
  }

  function addService() {
    setServices([...services, { name: '', description: '' }]);
  }

  function handleServiceChange(index, field, value) {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  }

  return (
    <div className="App">
      <div className="side-menu">
        {services.map((service, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Service Description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
            />
            <input
              type="int"
              placeholder="Service Duration"
              value={service.duration}
              onChange={(e) => handleServiceChange(index, 'integer', e.target.value)}
            />            
          </div>
        ))}
        <button onClick={addService}>Add Service</button>
        <button onClick={handleFormSubmit}>Send</button>
      </div>
      {view === 'month' ? (
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={openModal}
          className="Calendar"
        />
      ) : (
        <WeekCalendar
          startTime={moment('2024-01-01').startOf('isoWeek')}
          endTime={moment('2024-01-07').startOf('isoWeek').add(7, 'days')}
          events={events}
        />
      )}
      <button onClick={() => setView(view === 'month' ? 'week' : 'month')}>
        Switch to {view === 'month' ? 'Week' : 'Month'} View
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        className="Modal"
      >
        <h2>Add Event</h2>
        <form onSubmit={handleFormSubmit} className="form">
          <label>
            Name: 
            <input type="text" value={eventText} onChange={handleInputChange} className="input" />
          </label>
          <label>
            Email:
            
            <input type="email" value={eventText} onChange={handleInputChange} className="input" />
          </label>
          <label>
            Event Description:
            <input type="text" value={eventText} onChange={handleInputChange} className="input" />
          </label>                    
          <button type="submit" className="button">Add</button>
        </form>
        <button onClick={closeModal} className="button">Close</button>
      </Modal>
    </div>
  );
}

export default App;
