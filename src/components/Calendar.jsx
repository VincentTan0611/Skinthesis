import React, { useState, useEffect } from "react";

function Calendar({ onClose, onSelectDate, selectedDate }) {

  const [viewingMonths, setViewingMonths] = useState(false);
  const [viewingYears, setViewingYears] = useState(false);
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDay, setSelectedDay] = useState(initialDate);

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

    return {
      days: daysInMonth,
      firstDayOffset: firstDayOfMonth.getDay(),
    };
  };

  const handlePreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelectDate(selected);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "calendar-overlay") {
      onClose();
    }
  };

  const { days, firstDayOffset } = generateCalendarDays(currentDate);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleSelectMonth = (index) => {
    setCurrentDate(new Date(currentDate.getFullYear(), index, 1));
    setViewingMonths(false);
    if (viewingYears) setViewingYears(false); 
  };

  const handleSelectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setViewingYears(false);
  };

  const renderYearGrid = () => {
    const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <div style={styles.yearGrid}>
        {years.map((year) => (
          <div
            key={year}
            style={{
              ...styles.year,
              ...(currentDate.getFullYear() === year ? styles.selectedYear : {}),
            }}
            onClick={() => handleSelectYear(year)}
          >
            {year}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const currentDay = selectedDay.getDate();
      let newSelectedDate = new Date(year, month, currentDay);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      if (viewingMonths) {
        if (event.key === "ArrowLeft") {
          setCurrentDate(new Date(year, month - 1, 1));
        } else if (event.key === "ArrowRight") {
          setCurrentDate(new Date(year, month + 1, 1));
        } else if (event.key === "ArrowUp") {
          setCurrentDate(new Date(year, month - 4, 1));
        } else if (event.key === "ArrowDown") {
          setCurrentDate(new Date(year, month + 4, 1));
        } else if (event.key === "Enter") {
          handleSelectMonth(month);
        }
      } else if (viewingYears) {
        if (event.key === "ArrowLeft") {
          setCurrentDate(new Date(year - 1, month, 1));
        } else if (event.key === "ArrowRight") {
          setCurrentDate(new Date(year + 1, month, 1));
        } else if (event.key === "ArrowUp") {
          setCurrentDate(new Date(year - 4, month, 1));
        } else if (event.key === "ArrowDown") {
          setCurrentDate(new Date(year + 4, month, 1));
        } else if (event.key === "Enter") {
          handleSelectYear(year);
        }
      } else {
        // In day view: update the highlighted day on arrow key press
        if (event.key === "ArrowLeft") {
          newSelectedDate = currentDay === 1
            ? new Date(year, month - 1, new Date(year, month, 0).getDate())
            : new Date(year, month, currentDay - 1);
        } else if (event.key === "ArrowRight") {
          newSelectedDate = currentDay === daysInMonth
            ? new Date(year, month + 1, 1)
            : new Date(year, month, currentDay + 1);
        } else if (event.key === "ArrowUp") {
          if (currentDay - 7 < 1) {
            const prevMonthDays = new Date(year, month, 0).getDate();
            newSelectedDate = new Date(year, month - 1, prevMonthDays - (7 - currentDay));
          } else {
            newSelectedDate = new Date(year, month, currentDay - 7);
          }
        } else if (event.key === "ArrowDown") {
          if (currentDay + 7 > daysInMonth) {
            newSelectedDate = new Date(year, month + 1, currentDay + 7 - daysInMonth);
          } else {
            newSelectedDate = new Date(year, month, currentDay + 7);
          }
        } else if (event.key === "Enter") {
          // Commit selection on Enter
          onSelectDate(selectedDay);
          onClose();
          event.preventDefault();
          return;
        }

        // For arrow key navigation (non-Enter), update the highlighted day
        setSelectedDay(newSelectedDate);
        setCurrentDate(newSelectedDate);
      }

      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentDate, viewingMonths, viewingYears, selectedDay]);

  useEffect(() => {
    if (selectedDay) {
      setCurrentDate(new Date(selectedDay));
    }
  }, [selectedDay]);

  return (
    <div id="calendar-overlay" style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <button
            onClick={viewingYears ? handlePreviousYear : handlePreviousMonth}
            style={styles.arrow}
            aria-label={viewingYears ? "Previous Year" : "Previous Month"}
          >
            &#9664;
          </button>
          <div style={styles.monthYearContainer}>
            <h3 style={styles.monthYear} onClick={() => setViewingMonths(true)}>
              {currentDate.toLocaleString("default", { month: "long" })}
            </h3>
            <h3
              style={styles.yearYear}
              onClick={() => setViewingYears(true)} 
            >
              {currentDate.getFullYear()}
            </h3>
          </div>
          <button
            onClick={viewingYears ? handleNextYear : handleNextMonth}
            style={styles.arrow}
            aria-label={viewingYears ? "Next Year" : "Next Month"}
          >
            &#9654;
          </button>
        </div>

        {viewingYears ? (
          renderYearGrid() // Render the year grid when viewing years
        ) : viewingMonths ? (
          <div style={styles.monthGrid}>
            {months.map((month, index) => (
              <div
                key={month}
                style={{
                  ...styles.month,
                  ...(currentDate.getMonth() === index ? styles.selectedMonth : {}),
                }}
                onClick={() => handleSelectMonth(index)}
              >
                {month}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={styles.calendarHeader}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} style={styles.weekday}>
                  {day}
                </div>
              ))}
            </div>
            <div style={styles.calendar}>
              {Array(firstDayOffset).fill(null).map((_, idx) => (
                <div key={`empty-${idx}`} style={styles.empty}></div>
              ))}
              {days.map((day) => (
                <div
                  key={day}
                  style={{
                    ...styles.day,
                    ...(selectedDay && selectedDay.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() ? styles.selectedDay : {}),
                  }}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    width: "350px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "15px",
  },
  arrow: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "black",
  },
  monthYearContainer: {
    display: "flex",
    justifyContent: "center", // Centered for left and right
    alignItems: "center",
    gap: "5px", // Set gap between month and year headers
  },
  monthYear: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    cursor: "pointer",
    margin: 0, // Remove default margin
  },
  yearYear: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    margin: 0, // Remove default margin
    cursor: "pointer",
  },
  calendarHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
    borderBottom: "1px solid #ccc",
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    width: "100%",
  },
  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    width: "100%",
    marginTop: "15px",
  },
  yearGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    width: "100%",
    marginTop: "15px",
  },
  month: {
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "border 0.2s",
    color: "black",
    fontSize: "14px",
    border: "1px solid transparent",
  },
  selectedMonth: {
    border: "2px solid rgba(177, 46, 52, 1)",
    color: "black",
  },
  year: {
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "border 0.2s",
    color: "black",
    fontSize: "14px",
    border: "1px solid transparent",
  },
  selectedYear: {
    border: "2px solid rgba(177, 46, 52, 1)",
    color: "black",
  },
  weekday: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: "14px",
    padding: "10px 0",
  },
  day: {
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "background-color 0.2s",
    color: "black",
    fontSize: "14px",
  },
  empty: {
    width: "40px",
    height: "40px",
  },
  selectedDay: {
    border: "2px solid rgba(177, 46, 52, 1)",
    color: "black",
  },
};

export default Calendar;