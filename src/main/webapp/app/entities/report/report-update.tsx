import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ReportUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const reportEntity = useAppSelector(state => state.report.entity);
  const loading = useAppSelector(state => state.report.loading);
  const updating = useAppSelector(state => state.report.updating);
  const updateSuccess = useAppSelector(state => state.report.updateSuccess);

  const handleClose = () => {
    props.history.push('/report' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.reportTime = convertDateTimeToServer(values.reportTime);

    const entity = {
      ...reportEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          reportTime: displayDefaultDateTime(),
        }
      : {
          ...reportEntity,
          reportTime: convertDateTimeFromServer(reportEntity.reportTime),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="toDoAppV3App.report.home.createOrEditLabel" data-cy="ReportCreateUpdateHeading">
            <Translate contentKey="toDoAppV3App.report.home.createOrEditLabel">Create or edit a Report</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="report-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('toDoAppV3App.report.reportTime')}
                id="report-reportTime"
                name="reportTime"
                data-cy="reportTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('toDoAppV3App.report.totalTurnover')}
                id="report-totalTurnover"
                name="totalTurnover"
                data-cy="totalTurnover"
                type="text"
              />
              <ValidatedField
                label={translate('toDoAppV3App.report.status')}
                id="report-status"
                name="status"
                data-cy="status"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ReportUpdate;
