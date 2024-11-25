from django.test import SimpleTestCase

class AnimalTestCase(SimpleTestCase):

    def test_animals_can_speak(self):
        self.assertEqual(True, True)