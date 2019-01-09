class MyException(Exception):
    default_status_code = 404

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        dic= {}
        dic['payload'] = dict(self.payload or ())
        dic['message'] = self.message
        return dic
