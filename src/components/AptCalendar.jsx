import React, { useState, useEffect } from "react";

function AptCalendar({ onClose, onSelectDate, selectedDate }) {
    // Define the allowed date range: from today to 6 months in the future.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const allowedMaxDate = new Date(today);
    allowedMaxDate.setMonth(allowedMaxDate.getMonth() + 6);

    const [viewingMonths, setViewingMonths] = useState(false);
    const [viewingYears, setViewingYears] = useState(false);
    const initialDate = selectedDate ? new Date(selectedDate) : today;
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
        const newDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
        if (newDate >= today) {
            setCurrentDate(newDate);
        }
    };

    const handleNextYear = () => {
        const newDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1);
        if (newDate <= allowedMaxDate) {
            setCurrentDate(newDate);
        }
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        // Allow navigation if at least one day in the previous month is within the allowed range.
        const lastDayPrevMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
        if (lastDayPrevMonth >= today) {
            setCurrentDate(newDate);
        }
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        if (newDate <= allowedMaxDate) {
            setCurrentDate(newDate);
        }
    };

    const handleSelectDay = (day) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        selected.setHours(0, 0, 0, 0);
        // Only allow selection if within the allowed range.
        if (selected < today || selected > allowedMaxDate) return;
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
        const newDate = new Date(currentDate.getFullYear(), index, 1);
        if (newDate < today) {
            // If the month is before today, reset to today's month and year.
            newDate.setMonth(today.getMonth());
            newDate.setFullYear(today.getFullYear());
        }
        if (newDate > allowedMaxDate) return;
        setCurrentDate(newDate);
        setViewingMonths(false);
        if (viewingYears) setViewingYears(false);
    };

    const handleSelectYear = (year) => {
        const newDate = new Date(year, currentDate.getMonth(), 1);
        if (newDate < today) {
            newDate.setMonth(today.getMonth());
            newDate.setFullYear(today.getFullYear());
        }
        if (newDate > allowedMaxDate) return;
        setCurrentDate(newDate);
        setViewingYears(false);
    };

    const renderYearGrid = () => {
        const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
        const years = Array.from({ length: 12 }, (_, i) => startYear + i);

        return (
            <div style={styles.yearGrid}>
                {years.map((year) => {
                    // Disable year if it is before today or if it is greater than the allowedMaxDate's year.
                    const isDisabled = year < today.getFullYear() || year > allowedMaxDate.getFullYear();
                    return (
                        <div
                            key={year}
                            style={{
                                ...styles.year,
                                ...(currentDate.getFullYear() === year ? styles.selectedYear : {}),
                                ...(isDisabled ? styles.disabledYear : {}),
                            }}
                            onClick={() => {
                                if (!isDisabled) {
                                    handleSelectYear(year);
                                }
                            }}
                        >
                            {year}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Disable navigation arrows when the entire adjacent month is outside the allowed range.
    const previousMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const isPreviousDisabled = previousMonthLastDay < today;
    const isNextDisabled = nextMonthFirstDay > allowedMaxDate;
    const isYearPrevDisabled = viewingYears && (currentDate.getFullYear() - 1 < today.getFullYear());
    const isYearNextDisabled = viewingYears && (currentDate.getFullYear() + 1 > allowedMaxDate.getFullYear());



    useEffect(() => {
        // Helper to clamp a date between today and allowedMaxDate
        const clampDate = (date) => {
            if (date < today) return new Date(today);
            if (date > allowedMaxDate) return new Date(allowedMaxDate);
            return date;
        };

        const handleKeyDown = (event) => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const currentDay = selectedDay.getDate();
            let newSelectedDate = new Date(year, month, currentDay);
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            if (viewingMonths) {
                // For month view, compute a new date and clamp it.
                if (event.key === "ArrowLeft") {
                    let newDate = new Date(year, month - 1, 1);
                    newDate = clampDate(newDate);
                    setCurrentDate(newDate);
                } else if (event.key === "ArrowRight") {
                    let newDate = new Date(year, month + 1, 1);
                    newDate = clampDate(newDate);
                    setCurrentDate(newDate);
                } else if (event.key === "ArrowUp") {
                    let newDate = new Date(year, month - 4, 1);
                    newDate = clampDate(newDate);
                    setCurrentDate(newDate);
                } else if (event.key === "ArrowDown") {
                    let newDate = new Date(year, month + 4, 1);
                    newDate = clampDate(newDate);
                    setCurrentDate(newDate);
                } else if (event.key === "Enter") {
                    // Use the current month if Enter is pressed
                    handleSelectMonth(month);
                }
                // In your keydown handler:
            } else if (viewingYears) {
                // Use the month from selectedDate if available; otherwise, use today's month.
                const fixedMonth = selectedDate ? new Date(selectedDate).getMonth() : today.getMonth();
                let newYear = currentDate.getFullYear();
                if (event.key === "ArrowLeft") {
                    newYear = currentDate.getFullYear() - 1;
                } else if (event.key === "ArrowRight") {
                    newYear = currentDate.getFullYear() + 1;
                } else if (event.key === "ArrowUp") {
                    newYear = currentDate.getFullYear() - 4;
                } else if (event.key === "ArrowDown") {
                    newYear = currentDate.getFullYear() + 4;
                } else if (event.key === "Enter") {
                    handleSelectYear(currentDate.getFullYear());
                    event.preventDefault();
                    return;
                }
                let newDate = new Date(newYear, fixedMonth, 1);
                newDate = clampDate(newDate);
                setCurrentDate(newDate);
            }
            else {
                // Day view: update the highlighted day on arrow key press.
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
                    newSelectedDate.setHours(0, 0, 0, 0);
                    if (newSelectedDate >= today && newSelectedDate <= allowedMaxDate) {
                        onSelectDate(newSelectedDate);
                        onClose();
                    }
                    event.preventDefault();
                    return;
                }

                // Clamp the new date in day view before updating the states.
                newSelectedDate = clampDate(newSelectedDate);
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
        if (viewingYears) {
            // Always force the month to be the fixed month (from selectedDate or today)
            const fixedMonth = selectedDate ? new Date(selectedDate).getMonth() : today.getMonth();
            if (currentDate.getMonth() !== fixedMonth) {
                setCurrentDate(new Date(currentDate.getFullYear(), fixedMonth, currentDate.getDate()));
            }
        }
    }, [viewingYears, currentDate, selectedDate]);


    return (
        <div id="calendar-overlay" style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <button
                        onClick={viewingYears ? handlePreviousYear : handlePreviousMonth}
                        disabled={viewingYears ? isYearPrevDisabled : isPreviousDisabled}
                        style={{
                            ...styles.arrow,
                            color: viewingYears
                                ? (isYearPrevDisabled ? "#ccc" : "black")
                                : (isPreviousDisabled ? "#ccc" : "black"),
                            opacity: viewingYears
                                ? (isYearPrevDisabled ? 0.5 : 1)
                                : (isPreviousDisabled ? 0.5 : 1),
                            pointerEvents: viewingYears
                                ? (isYearPrevDisabled ? "none" : "auto")
                                : (isPreviousDisabled ? "none" : "auto"),
                        }}
                        aria-label={viewingYears ? "Previous Year" : "Previous Month"}
                    >
                        &#9664;
                    </button>

                    <div style={styles.monthYearContainer}>
                        <h3 style={styles.monthYear} onClick={() => setViewingMonths(true)}>
                            {currentDate.toLocaleString("default", { month: "long" })}
                        </h3>
                        <h3 style={styles.yearYear} onClick={() => setViewingYears(true)}>
                            {currentDate.getFullYear()}
                        </h3>
                    </div>

                    <button
                        onClick={viewingYears ? handleNextYear : handleNextMonth}
                        disabled={viewingYears ? isYearNextDisabled : isNextDisabled}
                        style={{
                            ...styles.arrow,
                            color: viewingYears
                                ? (isYearNextDisabled ? "#ccc" : "black")
                                : (isNextDisabled ? "#ccc" : "black"),
                            opacity: viewingYears
                                ? (isYearNextDisabled ? 0.5 : 1)
                                : (isNextDisabled ? 0.5 : 1),
                            pointerEvents: viewingYears
                                ? (isYearNextDisabled ? "none" : "auto")
                                : (isNextDisabled ? "none" : "auto"),
                        }}
                        aria-label={viewingYears ? "Next Year" : "Next Month"}
                    >
                        &#9654;
                    </button>
                </div>

                {viewingYears ? (
                    renderYearGrid()
                ) : viewingMonths ? (
                    <div style={styles.monthGrid}>
                        {months.map((month, index) => {
                            const monthStart = new Date(currentDate.getFullYear(), index, 1);
                            const monthEnd = new Date(currentDate.getFullYear(), index + 1, 0);
                            const isMonthDisabled = monthEnd < today || monthStart > allowedMaxDate;
                            return (
                                <div
                                    key={month}
                                    style={{
                                        ...styles.month,
                                        ...(currentDate.getMonth() === index ? styles.selectedMonth : {}),
                                        ...(isMonthDisabled ? styles.disabledDay : {}),
                                    }}
                                    onClick={() => {
                                        if (!isMonthDisabled) {
                                            handleSelectMonth(index);
                                        }
                                    }}
                                >
                                    {month}
                                </div>
                            );
                        })}
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
                            {Array(firstDayOffset)
                                .fill(null)
                                .map((_, idx) => (
                                    <div key={`empty-${idx}`} style={styles.empty}></div>
                                ))}
                            {days.map((day) => {
                                const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                dayDate.setHours(0, 0, 0, 0);
                                const isDisabled = dayDate < today || dayDate > allowedMaxDate;
                                return (
                                    <div
                                        key={day}
                                        style={{
                                            ...styles.day,
                                            ...(selectedDay &&
                                                selectedDay.toDateString() === dayDate.toDateString()
                                                ? styles.selectedDay
                                                : {}),
                                            ...(isDisabled ? styles.disabledDay : {}),
                                        }}
                                        onClick={() => {
                                            if (!isDisabled) {
                                                handleSelectDay(day);
                                            }
                                        }}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

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
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
    },
    monthYear: {
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
        cursor: "pointer",
        margin: 0,
    },
    yearYear: {
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
        margin: 0,
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
    disabledDay: {
        color: "#ccc",
        pointerEvents: "none",
        opacity: 0.5,
    },
    disabledYear: {
        color: "#ccc",
        pointerEvents: "none",
        opacity: 0.5,
    },
};

export default AptCalendar;