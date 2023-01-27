import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './order-details.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderDetailsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const orderDetailsEntity = useAppSelector(state => state.orderDetails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsDetailsHeading">
          <Translate contentKey="toDoAppV3App.orderDetails.detail.title">OrderDetails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderDetailsEntity.id}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="toDoAppV3App.orderDetails.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderDetailsEntity.quantity}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="toDoAppV3App.orderDetails.price">Price</Translate>
            </span>
          </dt>
          <dd>{orderDetailsEntity.price}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="toDoAppV3App.orderDetails.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderDetailsEntity.status}</dd>
          <dt>
            <Translate contentKey="toDoAppV3App.orderDetails.product">Product</Translate>
          </dt>
          <dd>{orderDetailsEntity.product ? orderDetailsEntity.product.id : ''}</dd>
          <dt>
            <Translate contentKey="toDoAppV3App.orderDetails.order">Order</Translate>
          </dt>
          <dd>{orderDetailsEntity.order ? orderDetailsEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-details/${orderDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetailsDetail;
