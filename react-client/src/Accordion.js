import React, { useState } from 'react';
import './Accordion.css';
import moment from 'moment';

const Accordion = ({ date, daily, weatherData }) => {

    const [isActive, setIsActive] = useState(false);
    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{date}</div>
                <span className="accordion-arrow">{isActive ? '-' : '+'}</span>
            </div>
            {isActive && <div className="accordion-content">
                <table className="today-table-header daily-details">
                    <thead>
                        <td>Status</td>
                        <td>Temperature</td>
                        <td>Pressure</td>
                        <td>Humidity</td>
                        <td>Cloudiness</td>
                        <td>Sunrise</td>
                        <td>Sunset</td>
                        <td>Moonrise</td>
                        <td>Moonset</td>
                    </thead>
                    <tbody className="today-table-body">
                        <tr>
                            <td><div>{daily?.weather[0]?.description}</div></td>
                            <td><div>{daily?.temp?.day} Celcius</div></td>
                            <td><div>{daily?.pressure} hPa</div></td>
                            <td><div>{daily?.humidity}%</div></td>
                            <td><div>{daily?.clouds}%</div></td>
                            <td><div>{moment.unix(daily?.sunrise).format("hh:mm a")}</div></td>
                            <td><div>{moment.unix(daily?.sunset).format("hh:mm a")}</div></td>
                            <td><div>{moment.unix(daily?.moonrise).format("hh:mm a")}</div></td>
                            <td><div>{moment.unix(daily?.moonset).format("hh:mm a")}</div></td>
                        </tr>
                    </tbody>
                </table>
                <div><b>Hourly Forecast</b></div>
                <table>
                    <tr>
                            {weatherData.hourly && weatherData.hourly.map((item, idx) => (
                                <td key={idx}>
                                    <table className="today-table-header">
                                        <thead>
                                            <td><div>{moment.unix(item?.dt).format("hh:mm a")}</div></td>
                                        </thead>
                                        <tbody className="today-table-body">
                                            <tr>
                                                <td>
                                                    <div>Status {item?.weather[0]?.description}</div>
                                                    <div>Temperature {item?.temp?.day} Celcius</div>
                                                    <div>Pressure {item?.pressure} hPa</div>
                                                    <div>Humidity {item?.humidity}%</div>
                                                    <div>Cloudiness {item?.clouds}%</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            ))}
                    </tr>
                </table>
                </div>
            }
        </div>
    )
};

            export default Accordion;