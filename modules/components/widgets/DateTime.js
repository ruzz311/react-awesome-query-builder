import React, {Component, PropTypes} from 'react';
import {Col, Input} from "react-bootstrap";
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'

export default class DateTimeWidget extends Component {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        delta: PropTypes.number.isRequired,
        timeFormat: PropTypes.string,
        dateFormat: PropTypes.string,
        valueFormat: PropTypes.string,
        locale: PropTypes.string,
    };

    constructor(props) {
        super(props);

        const {valueFormat, value, setValue} = props;
        let mValue = value ? moment(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }
    }

    static defaultProps = {
        timeFormat: 'HH:mm',
        dateFormat: 'DD.MM.YYYY',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        locale: 'ru',
    };

    handleChange(_value) {
        const {setValue, valueFormat} = this.props;
        const value = _value instanceof moment && _value.isValid() ? _value.format(valueFormat) : null;
        if (value)
            setValue(value);
    }

    render() {
        const {dateFormat, timeFormat, valueFormat, value, locale} = this.props;
        let dateValue = value ? moment(value, valueFormat) : null;
        return (
            <Col xs={9}>
                { this.props.config.settings.showLabels &&
                    <label>{this.props.label || this.props.config.settings.valueLabel || "Value"}</label>
                }
                <Datetime
                    timeFormat={timeFormat}
                    dateFormat={dateFormat}
                    locale={locale}
                    value={dateValue}
                    onChange={this.handleChange.bind(this)}
                    ref="datetime"
                />
            </Col>
        );
    }
}