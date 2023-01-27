import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { getEntities as getOrders } from 'app/entities/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-details.reducer';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderDetailsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const products = useAppSelector(state => state.product.entities);
  const orders = useAppSelector(state => state.order.entities);
  const orderDetailsEntity = useAppSelector(state => state.orderDetails.entity);
  const loading = useAppSelector(state => state.orderDetails.loading);
  const updating = useAppSelector(state => state.orderDetails.updating);
  const updateSuccess = useAppSelector(state => state.orderDetails.updateSuccess);

  const handleClose = () => {
    props.history.push('/order-details' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProducts({}));
    dispatch(getOrders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...orderDetailsEntity,
      ...values,
      product: products.find(it => it.id.toString() === values.productId.toString()),
      order: orders.find(it => it.id.toString() === values.orderId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...orderDetailsEntity,
          status: 'DONE',
          productId: orderDetailsEntity?.product?.id,
          orderId: orderDetailsEntity?.order?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="toDoAppV3App.orderDetails.home.createOrEditLabel" data-cy="OrderDetailsCreateUpdateHeading">
            <Translate contentKey="toDoAppV3App.orderDetails.home.createOrEditLabel">Create or edit a OrderDetails</Translate>
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
                  id="order-details-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('toDoAppV3App.orderDetails.quantity')}
                id="order-details-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
              />
              <ValidatedField
                label={translate('toDoAppV3App.orderDetails.price')}
                id="order-details-price"
                name="price"
                data-cy="price"
                type="text"
              />
              <ValidatedField
                label={translate('toDoAppV3App.orderDetails.status')}
                id="order-details-status"
                name="status"
                data-cy="status"
                type="select"
              >
                <option value="DONE">{translate('toDoAppV3App.OrderDetailStatus.DONE')}</option>
                <option value="PENDING_REFUND">{translate('toDoAppV3App.OrderDetailStatus.PENDING_REFUND')}</option>
                <option value="REFUNDED">{translate('toDoAppV3App.OrderDetailStatus.REFUNDED')}</option>
              </ValidatedField>
              <ValidatedField
                id="order-details-product"
                name="productId"
                data-cy="product"
                label={translate('toDoAppV3App.orderDetails.product')}
                type="select"
              >
                <option value="" key="0" />
                {products
                  ? products.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="order-details-order"
                name="orderId"
                data-cy="order"
                label={translate('toDoAppV3App.orderDetails.order')}
                type="select"
              >
                <option value="" key="0" />
                {orders
                  ? orders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order-details" replace color="info">
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

export default OrderDetailsUpdate;
