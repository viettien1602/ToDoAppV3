import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './order.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="toDoAppV3App.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="dateTime">
              <Translate contentKey="toDoAppV3App.order.dateTime">Date Time</Translate>
            </span>
          </dt>
          <dd>{orderEntity.dateTime ? <TextFormat value={orderEntity.dateTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="toDoAppV3App.order.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalPrice}</dd>
          <dt>
            <span id="deliveryAddress">
              <Translate contentKey="toDoAppV3App.order.deliveryAddress">Delivery Address</Translate>
            </span>
          </dt>
          <dd>{orderEntity.deliveryAddress}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="toDoAppV3App.order.note">Note</Translate>
            </span>
          </dt>
          <dd>{orderEntity.note}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="toDoAppV3App.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="toDoAppV3App.order.user">User</Translate>
          </dt>
          <dd>{orderEntity.user ? orderEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
