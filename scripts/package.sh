SCRIPT_DIR=$(dirname "$0")
ROOT_DIR=$SCRIPT_DIR/..
PACKAGE_DIR=./packaged-charts
#
for d in $ROOT_DIR/k8s-apps/charts/* ; do
    helm package -u $d -d ./packaged-charts
done

helm package -u $ROOT_DIR/charts/geekbrains-lecturer -d $PACKAGE_DIR

helm repo index $PACKAGE_DIR --url https://storage.yandexcloud.net/geekbrains-charts

AWS_ACCESS_KEY_ID=YCAJEg5SHNz6m2O3AiaaNL3Sb AWS_SECRET_ACCESS_KEY=YCP4flTXe6gPXUumLX1C7pz76CuQcojAJrQWk8ya aws \
  --endpoint-url=https://storage.yandexcloud.net/ \
  s3 cp \
  --recursive $PACKAGE_DIR/ s3://geekbrains-charts/